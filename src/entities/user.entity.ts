import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "username", nullable: true })
  username: string | null;

  @Column("text", { name: "password", nullable: true })
  password: string | null;

  @Column("text", {
    name: "createDate",
    nullable: true,
    default: () => "strftime('%Y-%m-%d %H:%M:%S', 'now')",
  })
  createDate: string | null;
}
