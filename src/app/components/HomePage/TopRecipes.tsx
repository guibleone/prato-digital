'use client'
import { delay, motion, Variants } from "framer-motion";


import MaxWidthWrapper from '../MaxWidthWrapper'
import CardRecipe from '../CardRecipe'
import Link from "next/link";
import { Button } from "@/components/ui/button";


const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1, transition: {
            duration: 1.5, staggerChildren: 0.2, y: {
                delayChildren: 0.5,
            }
        }
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
};


export default function TopRecipes() {
    return (
        <section className='py-20' >
            <MaxWidthWrapper>
                <div className='mb-8'>
                    <h1 className='text-2xl font-bold text-center'>Principais Receitas</h1>
                    <p className='text-sm text-muted-foreground text-center'>Veja as receitas mais populares do nosso site</p>
                </div>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className='flex flex-col justify-between sm:flex-row gap-10'>
                    <motion.div variants={itemVariants}>
                        <CardRecipe />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <CardRecipe />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <CardRecipe />
                    </motion.div>

                </motion.div>
                <motion.div
                    variants={itemVariants}
                    className='flex justify-center mt-12'>
                    <Button asChild>
                        <Link href='/receitas'>
                            Ver todas as receitas
                        </Link>
                    </Button>
                </motion.div>

            </MaxWidthWrapper>
        </section>
    )
}
