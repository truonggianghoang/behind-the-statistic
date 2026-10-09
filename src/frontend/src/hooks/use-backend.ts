import { type Category, createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useSiteContent() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["site-content"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getSiteContent();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProblems(category: Category | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["problems", category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listProblems(category);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProblem(slug: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["problem", slug],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getProblem(slug);
    },
    enabled: !!actor && !isFetching && slug.length > 0,
  });
}

export function useFeaturedIssues() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["featured-issues"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listFeaturedIssues();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useExamples(category: Category) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["examples", category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listExamples(category);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSearchProblems(term: string) {
  const { actor, isFetching } = useActor(createActor);
  const trimmed = term.trim();
  return useQuery({
    queryKey: ["search-problems", trimmed],
    queryFn: async () => {
      if (!actor) return [];
      return actor.searchProblems(trimmed);
    },
    enabled: !!actor && !isFetching && trimmed.length > 0,
  });
}

export function useSubmitContact() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (input: {
      name: string;
      email: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.submitContact(input.name, input.email, input.message);
    },
  });
}
