const Flag = ({ dataToShow }) => {
    return (
        <div>
            <img src={dataToShow.flags.png}
            style={{ width: '150px', height: 'auto', marginTop: '20px' }} />
        </div>
    )}
  
export default Flag