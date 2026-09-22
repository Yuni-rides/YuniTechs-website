import { Button, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="py-32 text-center">
      <Container>
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-secondary">
          404
        </p>
        <h1 className="mt-3 text-4xl font-bold">Page not found</h1>
        <p className="mt-4 text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button href="/" className="mt-8">
          Back to home
        </Button>
      </Container>
    </section>
  );
}
