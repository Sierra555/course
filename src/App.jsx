import { useState, useEffect } from 'react';
import Course from "./modules/Course";
import Phonebook from "./modules/Phonebook";
import { getData } from "./services/notes";

const App = () => {
  const [courses, setCourses] = useState([]);
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const personsUrl = 'http://localhost:3001/persons';
  const coursesUrl = 'http://localhost:3001/courses';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const personsResponse = await getData(personsUrl);
        const coursesResponse = await getData(coursesUrl);
        setCourses(coursesResponse);
        setPersons(personsResponse);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {courses.map(course => <Course key={course.id} nextCourse={course} />)}
      <Phonebook persons={persons} hostUrl={personsUrl} />
    </>
  );
}

export default App;