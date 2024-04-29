import { useState, useEffect } from 'react';
import { DiaryEntry, Visibility, Weather} from './types';
import { getAll } from './services/diaries';

const App = () => {
  // const [newDiary, SetNewDiary] = useState('');
  const [diaries, setDiaries] = useState<DiaryEntry[]>([
    { id: 1,
      date: '1988-1-1',
      weather: Weather.Sunny,
      visibility: Visibility.Great,
      comment: 'new comment'
    }
  ]);

  useEffect(() => {
    getAll().then(data => {
      setDiaries(data);
    });
  }, []);
  //
  //const diaryCreation = (event: React.SyntheticEvent) => {
  //  event.preventDefault()
  //  createDiary({ content: newNote }).then(data => {
  //    setNotes(diaries.concat(data))
  //  })
  //  SetNewDiary('')
  //};
      
  return (
    <div>
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
