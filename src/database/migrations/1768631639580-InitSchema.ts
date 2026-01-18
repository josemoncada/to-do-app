import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1768631639580 implements MigrationInterface {
    name = 'InitSchema1768631639580'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."to_do_priority_enum" AS ENUM('baja', 'media', 'alta')`);
        await queryRunner.query(`CREATE TABLE "to_do" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "priority" "public"."to_do_priority_enum" NOT NULL DEFAULT 'media', "is_completed" boolean NOT NULL DEFAULT false, "user_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_19d14b861427e18d619639c8f2b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "to_do" ADD CONSTRAINT "FK_f95b58e1f020b1646b8a6725785" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "to_do" DROP CONSTRAINT "FK_f95b58e1f020b1646b8a6725785"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "to_do"`);
        await queryRunner.query(`DROP TYPE "public"."to_do_priority_enum"`);
    }

}
