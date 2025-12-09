//import path from "path";
//import { fileURLToPath } from "url";

// 현재 파일 경로
// const __filename = fileURLToPath(import.meta.url);
// 현재 디렉토리 경로
// const __dirname = path.dirname(__filename);

const getPost = (req, res) => {
    // res.send('<div><h1>Post title</h1><p>Post Article</p></div>');
    // res.sendFile(path.join(__dirname, '..', 'public','images', '1751242528.png'));
    res.render("posts", {
        templateName: "post",
    })
}

export { getPost };