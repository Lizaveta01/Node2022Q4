import fs from "fs";

export const writeDataToFile = (filename: string, content: { id: string; username: string; age: string; hobbies: string; }[]) => {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8')
}