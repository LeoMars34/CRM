function InputFile(props) {
    const { name, setId, style, onChange } = props;

    return (
        <div className={style ? `container ${style}` : "container"}>
            <input onChange={onChange} multiple type="file" id={setId} />
            <label className="labelFile" for={setId}>
                <i>
                    <ion-icon name="cloud-upload-outline"></ion-icon>
                </i>
                {name}
            </label>
            <div id="addBtn" className="inputFile__addBtn none"></div>
        </div>
    );
}
export { InputFile };
