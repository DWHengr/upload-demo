import {useState} from "react";
import reactLogo from "./assets/react.svg";
import {stat} from "@tauri-apps/plugin-fs";
import {open} from '@tauri-apps/plugin-dialog';
import {upload} from "@tauri-apps/plugin-upload";
import "./App.css";

function App() {
    const [progress, setProgress] = useState(0)

    const handleOpenFile = async () => {
        const selected = await open({
            multiple: true,
        });
        if (Array.isArray(selected)) {
            onSendFile(selected[0].path)
        }
    }

    const onSendFile = async (path) => {
        let sum = 0;
        let fileInfo = await stat(path)
        upload("http://127.0.0.1:8080/test/send/file", path, (progress) => {
            console.log(progress)
            sum += progress.progress;
            setProgress(sum / fileInfo.size * 100)
        })
    }

    return (
        <div className="container">
            <h1>Welcome to Tauri!</h1>

            <div className="row">
                <a href="https://vitejs.dev" target="_blank">
                    <img src="/vite.svg" className="logo vite" alt="Vite logo"/>
                </a>
                <a href="https://tauri.app" target="_blank">
                    <img src="/tauri.svg" className="logo tauri" alt="Tauri logo"/>
                </a>
                <a href="https://reactjs.org" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>

            <p>upload file</p>
            <p>progress: {progress.toFixed(2)}%</p>
            <button onClick={handleOpenFile}>select</button>
        </div>
    );
}

export default App;
