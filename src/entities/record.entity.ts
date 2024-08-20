import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("record")
export class RecordEntyty {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "name" })
  name: string;

  @Column("text", { name: "type" })
  type: string;

  @Column("text", { name: "desc" })
  desc: string;

  @Column("text", { name: "createBy" })
  createBy: string;

  @Column("datetime", {
    name: "createTime",
    nullable: true,
    default: () => "datetime('now', 'localtime')",
  })
  createTime: string | null;
}
