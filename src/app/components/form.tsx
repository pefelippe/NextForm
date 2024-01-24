import {
  Autocomplete,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import React from "react";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useQuery } from "react-query";
import { z } from "zod";

import { fetchPersons, PersonName } from "../api/fetchPersons";
const phoneRegExp = /^\(\d{2}\) \d{5}-\d{4}$/;

const personSchema = z.object({
  id: z.number(),
  nome: z.string(),
});

const formSchema = z.object({
  pessoa: personSchema,
  telefone: z.string().refine((value) => phoneRegExp.test(value), {
    message: "Informe um telefone válido.",
  }),
  email: z.string().email().or(z.literal("")),
});
export type FormValues = z.infer<typeof formSchema>;

interface FormProps {}

const Form: React.FC<FormProps> = () => {
  const methods = useForm<FormValues>();
  const { handleSubmit, formState, reset, setValue, clearErrors } = methods;
  const { data: persons, isFetching } = useQuery("persons", fetchPersons);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    reset();
    setValue("pessoa", {
      id: 0,
      nome: "",
    });
  };

  const onError: SubmitErrorHandler<FormValues> = (errors) => {
    console.error(errors);
  };

  const formatTelefone = (value: string) => {
    const numbersOnly = value.replace(/\D/g, "");
    if (numbersOnly.length <= 10) {
      return numbersOnly.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    } else {
      return numbersOnly
        .slice(0, 15)
        .replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex flex-col items-start gap-6 rounded-3xl shadow p-8 border"
      >
        <Autocomplete
          id="asynchronous-demo"
          sx={{ width: 450 }}
          loading={isFetching}
          options={persons || []}
          value={methods.watch("pessoa") || null}
          onChange={(_, value) => {
            if (value) {
              setValue("pessoa", value);
              clearErrors("pessoa");
            }
          }}
          getOptionLabel={(option: PersonName) => option.nome}
          renderInput={(params) => (
            <TextField
              {...params}
              {...methods.register("pessoa", {
                validate: {
                  notSelected: (value) => !!value || "Selecione uma pessoa.",
                },
              })}
              label="Pessoa"
              error={!!formState.errors.pessoa}
              helperText={formState.errors.pessoa?.message}
              InputProps={{
                ...params.InputProps,
                endAdornment: isFetching ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null,
              }}
            />
          )}
        />

        <TextField
          {...methods.register("telefone", {
            required: "Campo obrigatório.",
            validate: {
              validTelefone: (value) => {
                const formattedValue = formatTelefone(value);
                methods.setValue("telefone", formattedValue);
                return (
                  phoneRegExp.test(formattedValue) ||
                  "Informe um telefone válido."
                );
              },
            },
          })}
          label="Telefone"
          className="w-full"
          error={!!formState.errors.telefone}
          helperText={formState.errors.telefone?.message}
        />

        <TextField
          {...methods.register("email", {
            required: "Campo obrigatório.",
            pattern: {
              value: /^\S+@\S+$/,
              message: "Insira um endereço de e-mail válido.",
            },
          })}
          label="E-mail"
          className="w-full"
          error={!!formState.errors.email}
          helperText={formState.errors.email?.message}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="w-full bg-blue-500 p-3"
          disabled={formState.isSubmitting}
        >
          Enviar
        </Button>
      </form>
    </FormProvider>
  );
};

export default Form;
