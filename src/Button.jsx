const inlineStyles = {
    color : "lightsalmon",
}


export const Button = (props) =>{
    console.log(props)
    return <button className="btn" style={inlineStyles}  onClick={props.onClick}>custom button</button>
}