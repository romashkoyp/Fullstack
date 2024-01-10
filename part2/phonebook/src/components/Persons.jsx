const Persons = ({ dataToShow }) => {
    return (
        <div>
            {dataToShow.map((person, index) => (
                <div key={index}>{person.name} - {person.number}</div>
            ))}
        </div>
    )
}

export default Persons