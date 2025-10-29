"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { CreateUser } from "../../../server/user";
import { useRouter } from "next/navigation";
import { useState } from "react";

const roleOptions = ["admin", "guru", "walimurid"] as const;

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.email(),
  password: z.string().min(8).max(50),
  roles: z.array(z.enum(roleOptions)).min(1, "Pilih minimal satu role"), // sekarang array of RoleEnum
});

// as const penting supaya TypeScript tahu ini literal types

export function DialogCloseButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      roles: [],
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const result = await CreateUser({
        email: values.email,
        password: values.password,
        name: values.name,
        role: values.roles,
      });
      if (result) {
        form.reset();
        alert(result.message);
        setOpen(false);
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      alert("User creation failed");
    }
    console.log(values);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Buat User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Buat User</DialogTitle>
          <DialogDescription>Buat user baru.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormDescription>This is your email address.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* role */}

            <FormField
              control={form.control}
              name="roles"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Peran</FormLabel>
                  <FormControl>
                    <div className="flex flex-col space-y-2">
                      {roleOptions.map((role) => (
                        <div key={role} className="flex items-start gap-3">
                          <Checkbox
                            id={`role-${role}`}
                            checked={field.value.includes(role)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange([...field.value, role]);
                              } else {
                                field.onChange(
                                  field.value.filter((r) => r !== role)
                                );
                              }
                            }}
                          />
                          <div className="grid gap-1">
                            <Label htmlFor={`role-${role}`}>{role}</Label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" {...field} type="password" />
                  </FormControl>
                  <FormDescription>This is your password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="sm:justify-start">
              <Button type="submit" variant="secondary">
                submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
