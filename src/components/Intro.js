export const Intro = ({
    className,
    style,
    title,
    description,
    instructions,
    hero,
    onDismiss:dismiss
    }) => {
    className = className+" d-flex justify-content-center align-items-center"
    return(
        <div id="intro" className={className} style={style}>
            <div id="inner" 
                className="d-flex h-100 w-100 position-relative overflow-hidden bg-white p-2">
                <div className="flex-grow-1 flex-shrink-0 d-flex flex-column position-relative overflow-hidden p-2 m-0 m-sm-2 me-sm-1"
                    style={{
                        maxWidth: "600px",
                        flexBasis: "60%",
                        backgroundColor: "rgba(255,255,255,0.8)",
                        }}>
                        <div className="overflow-auto">
                            <h1 className="display-3 fw-bold">{title}</h1>
                            <h2 className="mb-5" style={{fontWeight: 300}}>{description}</h2>
                            <h5>How to navigate the Treasure Hunt</h5>
                            <div id="instructions"
                                dangerouslySetInnerHTML={{__html: instructions}}></div>
                        </div>
                        <button type="button" 
                                className="btn btn-primary align-self-center mt-4" 
                            onClick={()=>dismiss()}>Got it!</button>
                </div>
                <div className="flex-grow-1 d-none d-sm-block m-0 m-sm-2 ms-sm-1" 
                    style={{
                        flexBasis: "40%",
                        backgroundImage: `url(${hero})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "cover"
                    }}>            
                </div>
            </div>
        </div> /*intro*/
    );
}