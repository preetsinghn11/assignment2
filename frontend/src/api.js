
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchCourses = async () => {
    try {
        const response = await api.get('/allCourses');
        return response.data;
    } catch (error) {
        console.error('Error fetching courses:', error);
        throw error;
    }
};

export const fetchStudents = async () => {
    try {
        const response = await api.get('/allStudents');
        return response.data;
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
    }
};
export const addStudent = async (data) => {
    try {
        const response = await api.post('/addStudent', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error posting students:', error);
        throw error;
    }
};

export const deleteStudent = async (id) => {
    try {
        const response = await api.delete(`/deleteStudent/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting students:', error);
        throw error;
    }
};
export const updateCourse = async (id, data) => {
    try {
        const response = await api.patch(`/updateCourse/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error deleting students:', error);
        throw error;
    }
};

// // Fetch a specific student by ID
// export const fetchStudentById = async (id) => {
//   try {
//     const response = await api.get(`/students/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching student with ID ${id}:`, error);
//     throw error;
//   }
// };

// // Fetch all courses
// export const fetchCourses = async () => {
//   try {
//     const response = await api.get('/courses');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching courses:', error);
//     throw error;
//   }
// };

// // Fetch a specific course by ID
// export const fetchCourseById = async (id) => {
//   try {
//     const response = await api.get(`/courses/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching course with ID ${id}:`, error);
//     throw error;
//   }
// };
