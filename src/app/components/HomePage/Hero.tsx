'use client'
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Image from 'next/image';
import MaxWidthWrapper from '../MaxWidthWrapper';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.2 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};


export default function Hero() {
    return (
        <MaxWidthWrapper>
            <motion.div
                className="py-20 flex items-center justify-between"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="flex gap-5 flex-col items-center text-center sm:text-start sm:items-start">
                    <motion.h1
                        className="text-gray-900 text-2xl font-bold tracking-tight sm:text-4xl"
                        variants={itemVariants}
                    >
                        Crie <span className="text-gray-900">receitas</span> e compartilhe com os seus amigos
                    </motion.h1>
                    <motion.p
                        className="text-sm sm:text-lg text-muted-foreground"
                        variants={itemVariants}
                    >
                        Entre para a comunidade de receitas mais gostosas do Brasil
                    </motion.p>
                    <motion.div className="flex gap-2" variants={itemVariants}>
                        <Button>Criar Receita</Button>
                        <Button variant={'ghost'}>Tendências</Button>
                    </motion.div>
                </div>

                <motion.div
                    className="hidden md:block"
                    variants={itemVariants}
                >
                    <Image priority src="/assets/hero.jpg" width={500} height={500} alt="hero" />
                </motion.div>
            </motion.div>
        </MaxWidthWrapper>
    )
}
