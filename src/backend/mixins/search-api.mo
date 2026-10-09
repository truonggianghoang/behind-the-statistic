import Map "mo:core/Map";
import Types "../types/content";
import SearchLib "../lib/search";

mixin (problems : Map.Map<Nat, Types.Problem>) {
  /// Free-text search across both Physical and Mental Wellbeing problems.
  public query func searchProblems(term : Text) : async [Types.Problem] {
    SearchLib.searchProblems(problems, term);
  };
};
