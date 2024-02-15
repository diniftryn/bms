export const typeDefs = `#graphql 
    type Class {
    id: ID!
    name: String
    description: String
    status: String
    instructor: Instructor
  }

    type Instructor {
    id: ID!
    name: String
    phone: String
    email: String
  }

  type Query {
	  class(id: ID!): Class 
    classes: [Class]
    instructor(id: ID!): Instructor
    instructors: [Instructor]
  }

  type Mutation {
    addClass (name:String, description:String, status:String, instructorId:ID) : Class
    updateClass(id:ID!, name:String, description:String, status:String, instructorId:String) : Class
    deleteClass(id:ID!) : Class
    addInstructor(name:String, phone:String, email:String): Instructor
    deleteInstructor(id:ID!): Instructor
  }
`;
