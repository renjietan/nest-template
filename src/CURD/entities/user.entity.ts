import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn({
        comment: '用户ID'
    })
    id: string;
    @Column({
        type: 'varchar',
        length: 12,
        comment: '用户名称'
    })
    username: string;

    @Column({
        type: 'varchar',
        length: 20,
        comment: '用户密码'
    })
    password: string;

    @CreateDateColumn({
        type: 'timestamp'
    })
    createDate: string
}
