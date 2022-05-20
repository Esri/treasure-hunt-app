export const CongratsScreen = ({
    className,
    style,
    title,
    hero,
    certificateURL,
    onDismiss:dismiss
    }) => {

    const copyToClipBoard = () => {
        navigator.clipboard.writeText(window.location.href);        
    }

    const tweetText = encodeURI("I've navigated a Geography Treasure Hunt in search of "+title+". Try it yourself!");

    className = className+" d-flex justify-content-center align-items-center"
    return(
        <div id="congrats" className={className} style={style}>
            <div id="inner" 
                className="h-auto position-relative overflow-hidden border bg-white ms-2 me-2 p-2"
                style={{width: "95%", maxWidth: "1000px", maxHeight: "95%"}}>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-close" 
                            onClick={()=>{dismiss()}}></button>
                </div>
                <div className="d-flex">
                    <div className="flex-grow-1 flex-shrink-0 d-flex flex-column position-relative overflow-hidden p-2 m-0 m-sm-2 me-sm-1"
                        style={{
                            flexBasis: "50%",
                            backgroundColor: "rgba(255,255,255,0.8)"
                            }}>
                            <div className="flex-grow-1 overflow-y-auto">
                                <h1 className="display-5 fw-bold">Congratulations!</h1>
                                <p className="h5 mb-5" style={{fontWeight: 400}}>You have successfully completed the <strong>{title}</strong> Treasure Hunt!</p>
                                <p className="h5" style={{fontWeight: 400}}>In recognition of your excellence, you can:</p>
                                <ul className="h5" style={{fontWeight: 400}}>
                                    <li className="mb-1"><a className="link-primary" href={certificateURL} download>Download</a> and print the Certificate of Achievement</li>
                                    <li>
                                        <p>Share your accomplishment on social media</p>
                                        <div className="d-flex">
                                            <a href={"https://twitter.com/intent/tweet?text="+tweetText+"&url="+window.location.href} 
                                                className="twitter-share-button btn btn-sm btn-link" 
                                                data-show-count="false"
                                                target="_blank"
                                                rel="noreferrer">Tweet</a>
                                            <div className="fb-share-button" 
                                                data-href="https://developers.facebook.com/docs/plugins/" 
                                                data-layout="button" 
                                                data-size="small">
                                                <a target="_blank" 
                                                    rel="noreferrer"
                                                    href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse" 
                                                    className="fb-xfbml-parse-ignore btn btn-sm btn-link">Facebook</a>
                                            </div>                                            
                                            <button className="btn btn-sm btn-link"
                                                    title="Copy link"
                                                    onClick={(event)=>{copyToClipBoard();alert("Copied!")}}>Copy Link</button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                    </div>
                    <div className="d-none d-sm-block m-0 m-sm-2 ms-sm-1" 
                        style={{
                            flexBasis: "50%",
                            backgroundImage: `url(${hero})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "contain"
                        }}>            
                    </div>
                </div>
            </div>
        </div> /*intro*/
    );
}