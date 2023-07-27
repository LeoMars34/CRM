function Loader() {
    return (
        <div className="container_flex_loader">
            <div className="container_flex">
                <div className="ring"></div>
                <div className="ring"></div>
                <div className="ring"></div>
                <p>Загрузка...</p>
            </div>
        </div>
    );
}

export { Loader };
