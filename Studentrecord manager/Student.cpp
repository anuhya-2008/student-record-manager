#include "Student.h"
#include <iostream>
#include <sstream>

using namespace std;

Student::Student()
{
    rollNo=0;
    age=0;
}

Student::Student(int r,string n,int a,string b,string c)
{
    rollNo=r;
    name=n;
    age=a;
    branch=b;
    contact=c;
}

void Student::input()
{
    cout<<"\nRoll Number : ";
    cin>>rollNo;
    cin.ignore();

    cout<<"Name        : ";
    getline(cin,name);

    cout<<"Age         : ";
    cin>>age;
    cin.ignore();

    cout<<"Branch      : ";
    getline(cin,branch);

    cout<<"Contact     : ";
    getline(cin,contact);
}

void Student::display()
{
    cout<<rollNo<<"\t"
        <<name<<"\t"
        <<age<<"\t"
        <<branch<<"\t"
        <<contact<<endl;
}

int Student::getRoll()
{
    return rollNo;
}

string Student::getName()
{
    return name;
}

void Student::save(ofstream &out)
{
    out<<rollNo<<"|"
       <<name<<"|"
       <<age<<"|"
       <<branch<<"|"
       <<contact<<"\n";
}

void Student::load(string line)
{
    stringstream ss(line);
    string temp;

    getline(ss,temp,'|');
    rollNo=stoi(temp);

    getline(ss,name,'|');

    getline(ss,temp,'|');
    age=stoi(temp);

    getline(ss,branch,'|');
    getline(ss,contact);
}