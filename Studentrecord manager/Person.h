#ifndef PERSON_H
#define PERSON_H

#include <string>
using namespace std;

class Person
{
protected:
    string name;
    int age;

public:
    virtual void display() = 0;   // Polymorphism
    virtual ~Person(){}
};

#endif