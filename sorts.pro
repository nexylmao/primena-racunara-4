mergesort([] , [ ]).
mergesort([A], [A]).
mergesort([A, B | R], S):-split([A, B | R], L1, L2), mergesort(L1, S1), mergesort(L2, S2), merge(S1, S2, S).

insertsort([], X, X).
insertsort([H | T], X, R) :- insert(H, X, X1), insertsort(T, X1, R).
insertsort(X, R) :- insertsort(X, [], R).

quicksort([],[]).
quicksort([X | Xs], Ys) :- partition(Xs, X, Left, Right), quicksort(Left, Ls), quicksort(Right, Rs), append(Ls, [X | Rs], Ys).