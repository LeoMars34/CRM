import { Input } from "../Elements/Input";
import { InputFile } from "../Elements/InputFile";
import { useState } from "react";
import { addFiles } from "../../Api";
import { InfoPopUp } from "../Service/InfoPopUp";

function SelsDocuments({ documents, currentSales }) {
    const [inputFile, setInputFile] = useState();
    const fileInput = document.getElementById("inputFileSels");
    if (fileInput) {
        fileInput.addEventListener("change", (event) => {
            const files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const fileName = file.name;
                const fileSizeBytes = file.size;
                const fileSizeMB = fileSizeBytes / 1024 ** 2;
                const fileSizeMBSlice = fileSizeMB.toFixed(2);
                const listItem = document.createElement("div");
                listItem.innerHTML = `${fileName} (${fileSizeMBSlice} mb)`;
            }
        });
    }
    function viewDocs(link) {
        window.open(link, "_blank");
    }
    function addFile() {
        if (document.getElementById("inputFileSels").files.length == 0) {
            return;
        }
        if (document.getElementById("addFileId").value.trim() == "") {
            return;
        }
        let formData = new FormData();
        formData.append("policy", currentSales.id);
        formData.append("name", document.getElementById("addFileId").value);
        let file = document.getElementById("inputFileSels");
        for (let i = 0; i < file.files.length; i++) {
            formData.append(
                `${document.getElementById("addFileId").value}_${i}_${
                    file.files[i].name
                }`,
                file.files[i]
            );
        }
        addFiles(formData).then((response) => {
            if (response.error) {
                InfoPopUp(response.error, "popup__Info_red");
            }
        });
    }

    return (
        <div className="container__SelsDocuments">
            <div className="content__SelsDocuments">
                <h3>Документы</h3>
                <div className="content__SelsDocuments_li">
                    {documents ? (
                        documents.map((k) => (
                            <li
                                onClick={() => {
                                    viewDocs(k.file);
                                }}
                                className="liSales"
                            >
                                {k.name} {k.date_add}
                            </li>
                        ))
                    ) : (
                        <></>
                    )}
                </div>
                <div className="content__SelsDocuments_inputs">
                    <InputFile
                        onChange={() => {
                            setInputFile(true);
                        }}
                        setId="inputFileSels"
                        name="Загрузить документы"
                    />
                    {inputFile ? (
                        <Input setId="addFileId" name="Название" />
                    ) : (
                        <></>
                    )}
                    {inputFile ? (
                        <div className="bigBtn" onClick={addFile}>
                            <ion-icon name="checkmark-circle-outline"></ion-icon>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    );
}
export { SelsDocuments };
