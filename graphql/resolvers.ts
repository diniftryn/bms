import { Context } from "@/pages/api/graphql";

export const resolvers = {
  Query: {
    class: async (_parent: any, args: any, context: Context) => {
      return await context.prisma.class.findUnique({
        where: {
          id: args.id
        }
      });
    },
    classes: async (_parent: any, _args: any, context: Context) => {
      return await context.prisma.class.findMany();
    },
    instructor: async (_parent: any, args: any, context: Context) => {
      return await context.prisma.instructor.findUnique({
        where: {
          id: args.id
        }
      });
    },
    instructors: async (_parent: any, _args: any, context: Context) => {
      return await context.prisma.instructor.findMany();
    }
  },
  // nested resolve function to get instructors in classes
  Class: {
    instructor: async (parent: any, _args: any, context: Context) => {
      return await context.prisma.instructor.findUnique({
        where: {
          id: parent.instructorId
        }
      });
    }
  },
  Mutation: {
    addClass: async (_parent: any, args: any, context: Context) => {
      return await context.prisma.class.create({
        data: {
          name: args.name,
          description: args.description,
          status: args.status,
          instructorId: args.instructorId
        }
      });
    },
    updateClass: async (_parent: any, args: any, context: Context) => {
      return await context.prisma.class.update({
        where: {
          id: args.id
        },
        data: {
          name: args.name,
          description: args.description,
          status: args.status,
          instructorId: args.instructorId
        }
      });
    },
    deleteClass: async (_parent: any, args: any, context: Context) => {
      return await context.prisma.class.delete({
        where: {
          id: args.id
        }
      });
    },

    // Instructor Mutations
    addInstructor: async (_parent: any, args: any, context: Context) => {
      return await context.prisma.instructor.create({
        data: {
          name: args.name,
          phone: args.phone,
          email: args.email
        }
      });
    },
    deleteInstructor: async (_parent: any, args: any, context: Context) => {
      return await context.prisma.instructor.delete({
        where: {
          id: args.id
        }
      });
    }
  }
};
