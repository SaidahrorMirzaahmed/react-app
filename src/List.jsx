
const items = [
    {
        "FirstName" : "Sayidahror",
        "LastName" : "Mirzaakhmedov",
        "IsReal" : true
    },
    {
        "FirstName" : "John",
        "LastName" : "Doe",
        "IsReal" : false
    },
]

export const List = () =>{
    return (
        items.map((item, index) => {
            return (
                <div>
                    <section key={index} className = {item.IsReal ? "completed" : ""}>
                        <span>{item.FirstName}</span>
                        <br />
                        <span>{item.LastName}</span>
                    </section>
                </div>
            )
        })
    )
}