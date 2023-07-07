<?php

namespace App\Controller;

namespace App\Controller;

use App\Form\ContactFormType;
use App\Entity\Contact;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ContactController extends AbstractController
{
    #[Route('/contact', name: 'app_contact')]
    public function index(Request $request): Response
    {
        $contact = new Contact(); // Créez une instance de l'entité Contact

        $form = $this->createForm(ContactFormType::class, $contact); // Utilisez $contact comme deuxième argument

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // Traitez le formulaire soumis

            // Persistez et flush l'entité Contact
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($contact);
            $entityManager->flush();

            // Redirigez l'utilisateur vers une autre page ou affichez un message de succès
            return $this->redirectToRoute('app_success');
        }

        return $this->render('contact/index.html.twig', [
            'form' => $form->createView(),
            'controller_name' => 'ContactController',
        ]);
    }
}
