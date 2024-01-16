const Languages = ({ dataToShow }) => {
    return (
        <div>
            <h3>Languages:</h3>
            {Object.keys(dataToShow).map((languageCode, index) => (
                <div key={index}>
                    {dataToShow[languageCode]}
                </div>
            ))}
        </div>
    )}
  
export default Languages
 