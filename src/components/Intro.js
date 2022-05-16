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
                className="d-flex h-auto mh-95 w-95 position-relative overflow-hidden border bg-white ms-2 me-2 p-2"
                style={{maxWidth: "800px"}}>
                <div className="flex-grow-1 d-flex flex-column position-relative overflow-hidden p-2 m-0 m-sm-2 me-sm-1"
                    style={{
                        flexBasis: "50%",
                        backgroundColor: "rgba(255,255,255,0.8)"
                        }}>
                        <div className="flex-grow-1 flex-shrink-1 overflow-y-auto">
                            <h1 className="display-3 fw-bold">{title}</h1>
                            <h2 className="mb-5" style={{fontWeight: 300}}>{description}</h2>
                            <h5>How to navigate the Treasure Hunt</h5>
                            <div id="instructions"
                                dangerouslySetInnerHTML={{__html: instructions}}></div>
                        </div>
                        <button type="button" 
                                className="btn btn-primary align-self-center mt-2" 
                            onClick={()=>dismiss()}>Start!</button>
                </div>
                <div className="flex-grow-1 d-none d-sm-block m-0 m-sm-2 ms-sm-1" 
                    style={{
                        flexBasis: "50%",
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