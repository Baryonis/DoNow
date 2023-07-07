<?php

namespace App\Repository;

use App\Entity\NoteList;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<NoteList>
 *
 * @method NoteList|null find($id, $lockMode = null, $lockVersion = null)
 * @method NoteList|null findOneBy(array $criteria, array $orderBy = null)
 * @method NoteList[]    findAll()
 * @method NoteList[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class NoteListRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, NoteList::class);
    }

    public function save(NoteList $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(NoteList $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }
}
