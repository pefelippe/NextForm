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
  const persons = await fetch("http://localhost:3001/persons").then((res) =>
    res.json(),
  );

  // se o json-server estiver off
  if (!persons) return personsMock;

  return persons;
};
