export const PhotoCredits = ({
    className, 
    style, 
    attribution, 
    sourceReferenceURL,
    license,
    licenseReferenceURL
    }) => {
    return(
        <div className={className} style={style}>
        Photo credit:
        {
        sourceReferenceURL && 
        <a href={sourceReferenceURL} 
            target="_blank" 
            rel="noreferrer" 
            className="ms-1 me-1">{attribution}</a>
        }
        {
        !sourceReferenceURL && 
        <span className="ms-1 me-1">{attribution}</span>
        }
        /
        {
        licenseReferenceURL &&
        <a href={licenseReferenceURL} 
            target="_blank" 
            rel="noreferrer" 
            className="ms-1 me-1">{license}</a>
        }
        {
        !licenseReferenceURL && 
        <span className="ms-1 me-1">{license}</span>
        }
        </div>
    );
}