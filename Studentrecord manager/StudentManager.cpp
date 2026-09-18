#include "StudentManager.h"
#include <fstream>
#include <iostream>

using namespace std;

void StudentManager::loadFile()
{
    students.clear();

    ifstream in("students.txt");
    string line;

    while(getline(in, line))
    {
        Student s;
        s.load(line);
        students.push_back(s);
    }
}

void StudentManager::saveFile()
{
    ofstream out("students.txt");

    for(auto &s : students)
        s.save(out);
}

void StudentManager::addStudent()
{
    loadFile();

    Student s;
    s.input();

    // Check duplicate roll number
    for(auto &x : students)
    {
        if(x.getRoll() == s.getRoll())
        {
            cout << "\nRoll Number already exists!\n";
            return;
        }
    }

    students.push_back(s);
    saveFile();

    cout << "\nStudent Added Successfully!\n";
}

void StudentManager::viewStudents()
{
    loadFile();

    if(students.empty())
    {
        cout << "\nNo Records Found.\n";
        return;
    }

    cout << "\n=============================================================\n";
    cout << "Roll\tName\tAge\tBranch\tContact\n";
    cout << "=============================================================\n";

    for(auto &s : students)
        s.display();
}

void StudentManager::searchStudent()
{
    cout << "\nSearch module will be added next.\n";
}

void StudentManager::updateStudent()
{
    cout << "\nUpdate module will be added next.\n";
}

void StudentManager::deleteStudent()
{
    cout << "\nDelete module will be added next.\n";
}

void StudentManager::sortByRoll()
{
    cout << "\nSort module will be added next.\n";
}

void StudentManager::sortByName()
{
    cout << "\nSort by Name will be added next.\n";
}

vector<Student>& StudentManager::getStudents()
{
    return students;
}