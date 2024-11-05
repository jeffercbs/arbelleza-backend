import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tokens")
export class Token {
    @PrimaryGeneratedColumn()
    tokeId: string

    @Column("text")
    token: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
