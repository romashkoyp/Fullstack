import { useState, useEffect } from 'react';
import { DiaryEntry, Visibility, Weather} from './types';
import { getAll, createDiary } from './services/diaries';

const App = () => {
  const [newDate, SetNewDate] = useState('');
  const [newWeather, SetNewWeather] = useState('');
  const [newVisibility, SetNewVisibility] = useState('');
  const [newComment, SetNewComment] = useState('');
  const [diaries, setDiaries] = useState<DiaryEntry[]>([
    { id: 1,
      date: '1988-1-1',
      weather: Weather.Sunny,
      visibility: Visibility.Great
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
      weather: newWeather,
      visibility: newVisibility,
      comment: newComment
     })
      .then(data => {
        setDiaries(diaries.concat(data));
        setErrorMessage('');
        SetNewDate('');
        SetNewWeather('');
        SetNewVisibility('');
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
      
  return (
    <div>
      <h1>New diary</h1>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <form onSubmit={diaryCreation}>
        <div>
          date
          <input
            value={newDate}
            onChange={(event) => SetNewDate(event.target.value)}
          />
        </div>
        <div>
          weather
          <input
            value={newWeather}
            onChange={(event) => SetNewWeather(event.target.value)} 
          /> 
        </div>
        <div>
          visibility
          <input
            value={newVisibility}
            onChange={(event) => SetNewVisibility(event.target.value)} 
          /> 
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
