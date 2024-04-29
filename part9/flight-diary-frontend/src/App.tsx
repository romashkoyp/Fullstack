import { useState, useEffect } from 'react';
import { DiaryEntry, Visibility, Weather} from './types';
import { getAll, createDiary } from './services/diaries';

const App = () => {
  const [newDate, SetNewDate] = useState('');
  const [selectedWeather, setSelectedWeather] = useState<Weather>(Weather.Sunny);
  const [selectedVisibility, setSelectedVisibility] = useState<Visibility>(Visibility.Great);
  const [newComment, SetNewComment] = useState('');
  const [diaries, setDiaries] = useState<DiaryEntry[]>([
    { 
      id: 1,
      date: '1988-1-1',
      weather: Weather.Sunny,
      visibility: Visibility.Great,
      comment: 'test comment'
    }
  ]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    getAll().then(data => {
      setDiaries(data);
    });
  }, []);
  
  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createDiary({ 
      date: newDate,
      weather: selectedWeather,
      visibility: selectedVisibility,
      comment: newComment
     })
      .then(data => {
        setDiaries(diaries.concat(data));
        setErrorMessage('');
        SetNewDate('');
        setSelectedWeather(Weather.Sunny);
        setSelectedVisibility(Visibility.Great);
        SetNewComment('');
      })
      .catch(error => {
        if (error.response) {
          setErrorMessage(error.response.data);
          //console.log(error.response.data);
        } else {
          setErrorMessage('An error occurred while creating the diary entry.');
        }
      });
  };

  const currentDate = new Date().toISOString().split('T')[0];
  // console.log(currentDate);

  const handleWeatherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedWeather(event.target.value as Weather);
  };

  const handleVisibilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedVisibility(event.target.value as Visibility);
  };
     
  return (
    <div>
      <h1>New diary</h1>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <form onSubmit={diaryCreation}>
        <div>
          date
          <input
            type='date'
            value={newDate}
            min="2000-01-01"
            max={currentDate}
            required pattern="\d{4}-\d{2}-\d{2}"
            onChange={(event) => SetNewDate(event.target.value)}
          />
        </div>
        <div>
          select weather
          {Object.values(Weather).map((weather) => (
            <div key={weather}>
              <input
                type="radio"
                id={weather}
                value={weather}
                checked={selectedWeather === weather}
                onChange={handleWeatherChange}
              />
              <label htmlFor={weather}>{weather}</label>
            </div>
          ))}
        </div>
        <div>
          select visibility
          {Object.values(Visibility).map((visibility) => (
            <div key={visibility}>
              <input
                type="radio"
                id={visibility}
                value={visibility}
                checked={selectedVisibility === visibility}
                onChange={handleVisibilityChange}
              />
              <label htmlFor={visibility}>{visibility}</label>
            </div>
          ))}
        </div>
        <div>
          comment
          <input
            value={newComment}
            onChange={(event) => SetNewComment(event.target.value)} 
          /> 
        </div>
        <button type='submit'>add</button>
      </form>
      <h1>Diary entries</h1>
      <div>
          {diaries.map(diary => (
            <div key={diary.id}>
              <h3>{diary.date}</h3>
              <p style={{ marginBottom: '0px' }}>{diary.weather}</p>
              <p style={{ marginTop: '0px' }}>{diary.visibility}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;
