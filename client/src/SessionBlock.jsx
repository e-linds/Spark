function SessionBlock({ title, practitioner }) {

    return(
        <article id="sessionblock">
            {/* <img src={image_url ? image_url: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"}/> */}
            <p>{title}: {practitioner}</p>
        </article>
    )
}

export default SessionBlock

