#ifndef STUDENTMANAGER_H
#define STUDENTMANAGER_H

#include "Student.h"
#include <vector>

using namespace std;

class StudentManager
{
private:
    vector<Student> students;

public:
    // File Handling
    void loadFile();
    void saveFile();

    // CRUD Operations
    void addStudent();
    void viewStudents();
    void searchStudent();
    void updateStudent();
    void deleteStudent();

    // Sorting
    void sortByRoll();
    void sortByName();

    // Dashboard
    vector<Student>& getStudents();
};

#endif