const { PrismaClient } = require('@prisma/client')

const db = new PrismaClient()

async function main() {
    try {
        await db.category.createMany({
            data: [
                {name: 'Computer Science'},
                {name: 'Fitness'},
                {name: 'Music'},
                {name: 'Photography'},
                {name: 'Accounting'},
                {name: 'Engineering'},
                {name: 'Filming'},
            ]
        })
        console.log('Create data in Category DB')
    } catch (error) {
        console.log(error)
    }
}
main()