#ifndef STUDENT_H
#define STUDENT_H

#include "Person.h"
#include <fstream>

class Student : public Person
{
private:
    int rollNo;
    string branch;
    string contact;

public:
    Student();
    Student(int,string,int,string,string);

    void input();
    void display();

    int getRoll();
    string getName();

    void save(ofstream&);
    void load(string);
};

#endif