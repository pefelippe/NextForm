import { api } from "./axios";

export interface PersonName {
  id: number;
  nome: string;
}

const personsMock: PersonName[] = [
  {
    id: 1,
    nome: "Carlos Silva Lima",
  },
  {
    id: 2,
    nome: "Carlito Ramos Junior",
  },
  {
    id: 3,
    nome: "Paulo Felipe Castro",
  },
];

export const fetchPersons = async (): Promise<PersonName[]> => {
  try {
    const persons = await api.get("/persons");
    const data = persons?.data;
    return data;
  } catch (error) {
    console.error("Error fetching persons:", error);
    return personsMock; // Return the mock response on axios error
  }
};
