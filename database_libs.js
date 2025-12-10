const fileClient = supabase.createClient(
    'https://jbhnzmrqeuuydclrliag.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiaG56bXJxZXV1eWRjbHJsaWFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzMzM1MDUsImV4cCI6MjA4MDkwOTUwNX0.2Kx5M2idUHpmqPo3jXisDcFxar2F3YoySay0apSy_TE'
);

async function toBlob(input, type = "application/octet-stream") {

    // Already a Blob or File
    if (input instanceof Blob) {
        return input;
    }

    // ArrayBuffer-like
    if (input instanceof ArrayBuffer) {
        return new Blob([input], { type });
    }

    if (ArrayBuffer.isView(input)) { // handles Uint8Array, DataView, etc.
        return new Blob([input.buffer], { type });
    }

    // Browser File
    if (typeof File !== "undefined" && input instanceof File) {
        return new Blob([input], { type: input.type || type });
    }

    // ReadableStream (Safari, some Supabase downloads)
    if (input instanceof ReadableStream) {
        const reader = input.getReader();
        const chunks = [];
        let result;

        while (!(result = await reader.read()).done) {
            chunks.push(result.value);
        }

        return new Blob(chunks, { type });
    }

    // String
    if (typeof input === "string") {
        return new Blob([input], { type: "text/plain" });
    }

    // JSON object
    if (typeof input === "object") {
        return new Blob([JSON.stringify(input)], { type: "application/json" });
    }

    // Fallback: convert to string
    return new Blob([String(input)], { type: "text/plain" });
}

const db = {
    writeFile: async function(name, content) {
        const { data, error } = await fileClient
            .storage
            .from('db')
            .upload(name, await toBlob(content), {
            upsert: true, // allows overwriting
            });

        if (error) {
            console.error(error);
        } else {
            console.log('File written!');
        }
    },

    readFile: async function(name) {
        const { data, error } = await fileClient
            .storage
            .from('db')
            .download(name);

        if (error) {
            console.error(error);
            return null;
        }

        const text = await data.text();
        return text;
    },

    deleteFile: async function(path) {
        const { error } = await fileClient
            .storage
            .from('db')
            .remove([path]); // must be an array

        if (error) console.error(error);
        else console.log("File deleted:", path);
    },

    renameFile: async function(oldPath, newPath) {
        // Step 1: download old file
        const { data: fileData, error: dlError } = await fileClient
            .storage
            .from('db')
            .download(oldPath);

        if (dlError) return console.error(dlError);

        // Step 2: upload to new path
        const { error: upError } = await fileClient
            .storage
            .from('db')
            .upload(newPath, await toBlob(fileData), { upsert: true });

        if (upError) return console.error(upError);

        // Step 3: delete old file
        const { error: delError } = await fileClient
            .storage
            .from('db')
            .remove([oldPath]);

        if (delError) return console.error(delError);

        console.log("Renamed:", oldPath, "→", newPath);
    },

    createDirectory: async function(dir) {
        if (!dir.endsWith("/")) dir += "/";

        const placeholder = new Blob([""], { type: "text/plain" });

        const { error } = await fileClient
            .storage
            .from('db')
            .upload(dir + ".keep", placeholder, { upsert: true });

        if (error) console.error(error);
        else console.log("Directory created:", dir);
    },

    listDirectory: async function(dir) {
        const { data, error } = await fileClient
            .storage
            .from('db')
            .list(dir, { limit: 1000 });

        if (error) console.error(error);
        return (data || []).filter(item => item.name !== ".keep");
    },

    deleteDirectory: async function(dir) {
        const items = await db.listDirectory(dir);
        if (!items) return;

        const paths = items.map(i => dir + i.name);

        const { error } = await fileClient
            .storage
            .from('db')
            .remove(paths);

        if (error) console.error(error);
        else console.log("Directory deleted:", dir);
    },

    renameDirectory: async function(oldDir, newDir) {
        if (!oldDir.endsWith("/")) oldDir += "/";
        if (!newDir.endsWith("/")) newDir += "/";

        const items = await db.listDirectory(oldDir);
        if (!items) return;

        for (const item of items) {
            await db.renameFile(oldDir + item.name, newDir + item.name);
        }

        await db.deleteDirectory(oldDir);

        console.log("Directory renamed:", oldDir, "→", newDir);
    }
};