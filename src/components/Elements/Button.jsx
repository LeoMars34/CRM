function Button({ name, setId, style, onClick }) {
    return (
        <button onClick={onClick} className={style} id={setId ? setId : ""}>
            <span>{name}</span> <i></i>
        </button>
    );
}
export { Button };
