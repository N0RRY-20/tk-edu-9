import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { UserWithRole } from "better-auth/plugins";
import { updateUser } from "../../../server/user";
import { useState } from "react";
import { useRouter } from "next/navigation";

const roleOptions = ["admin", "guru", "walimurid"] as const;

const formSchema = z.object({
  userId: z.string().min(2).max(50),
  name: z.string().min(2).max(50),
  email: z.email(),
  newPassword: z.string().min(8).max(50),
  roles: z.array(z.enum(roleOptions)).min(1, "Pilih minimal satu role"), // sekarang array of RoleEnum
});

export const UpdateUserForm = ({ user }: { user: UserWithRole }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: user.id,
      name: user.name,
      email: user.email,
      newPassword: "",
      roles: user.role ? [user.role as (typeof roleOptions)[number]] : [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const result = await updateUser({
        userId: values.userId,
        data: {
          name: values.name,
          email: values.email,
        },
        newPassword: values.newPassword,
        role: values.roles,
      });
      if (result) {
        form.reset();
        alert("User updated successfully");
        setOpen(false);
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      alert("User update failed");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Buat User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update User</DialogTitle>
          <DialogDescription>Update user.</DialogDescription>
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@example.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="********"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormDescription>
                      This is your new password.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="roles"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Roles</FormLabel>
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
                    <FormDescription>
                      Pilih role yang diinginkan.
                    </FormDescription>
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
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
