import React, { useState } from "react";
import { Container, VStack, HStack, Input, Button, Text, Box, IconButton } from "@chakra-ui/react";
import { FaPlus, FaMinus } from "react-icons/fa";

class FacultyNode {
  constructor(name, dean, groups, students) {
    this.name = name;
    this.dean = dean;
    this.groups = groups;
    this.students = students;
    this.next = null;
  }
}

class University {
  constructor() {
    this.head = null;
  }

  addFaculty(name, dean, groups, students) {
    const newFaculty = new FacultyNode(name, dean, groups, students);
    if (!this.head) {
      this.head = newFaculty;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newFaculty;
    }
  }

  addGroup(facultyName) {
    let current = this.head;
    while (current) {
      if (current.name === facultyName) {
        current.groups += 1;
        return;
      }
      current = current.next;
    }
  }

  delGroup(facultyName) {
    let current = this.head;
    while (current) {
      if (current.name === facultyName && current.groups > 0) {
        current.groups -= 1;
        return;
      }
      current = current.next;
    }
  }

  calcStud(facultyName) {
    let current = this.head;
    while (current) {
      if (current.name === facultyName) {
        return current.students;
      }
      current = current.next;
    }
    return 0;
  }

  getFaculties() {
    const faculties = [];
    let current = this.head;
    while (current) {
      faculties.push(current);
      current = current.next;
    }
    return faculties;
  }
}

const Index = () => {
  const [university] = useState(new University());
  const [facultyName, setFacultyName] = useState("");
  const [dean, setDean] = useState("");
  const [groups, setGroups] = useState(0);
  const [students, setStudents] = useState(0);
  const [selectedFaculty, setSelectedFaculty] = useState("");

  const handleAddFaculty = () => {
    university.addFaculty(facultyName, dean, groups, students);
    setFacultyName("");
    setDean("");
    setGroups(0);
    setStudents(0);
  };

  const handleAddGroup = (name) => {
    university.addGroup(name);
    setSelectedFaculty(name);
  };

  const handleDelGroup = (name) => {
    university.delGroup(name);
    setSelectedFaculty(name);
  };

  const faculties = university.getFaculties();

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">University Management</Text>
        <HStack spacing={4} width="100%">
          <Input placeholder="Faculty Name" value={facultyName} onChange={(e) => setFacultyName(e.target.value)} />
          <Input placeholder="Dean" value={dean} onChange={(e) => setDean(e.target.value)} />
          <Input placeholder="Groups" type="number" value={groups} onChange={(e) => setGroups(parseInt(e.target.value))} />
          <Input placeholder="Students" type="number" value={students} onChange={(e) => setStudents(parseInt(e.target.value))} />
          <Button onClick={handleAddFaculty} colorScheme="teal">
            Add Faculty
          </Button>
        </HStack>
        {faculties.map((faculty, index) => (
          <Box key={index} p={4} borderWidth="1px" borderRadius="lg" width="100%">
            <Text fontSize="lg" fontWeight="bold">
              {faculty.name}
            </Text>
            <Text>Dean: {faculty.dean}</Text>
            <Text>Groups: {faculty.groups}</Text>
            <Text>Students: {faculty.students}</Text>
            <HStack spacing={2} mt={2}>
              <IconButton aria-label="Add Group" icon={<FaPlus />} onClick={() => handleAddGroup(faculty.name)} />
              <IconButton aria-label="Delete Group" icon={<FaMinus />} onClick={() => handleDelGroup(faculty.name)} />
            </HStack>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;
