fibonacci(1, [1]).
fibonacci(2, [1,1]).
fibonacci(N, [Z, X, Y | T]) :- N1 is N - 1, fibonacci(N1, [X,Y|T]), Z is X + Y.

index(_, [], _) :- false.
index(X, [X | _], 1).
index(X, [Y | T], N1) :- X \= Y, index(X, T, N), N \= -1 ,N1 is N + 1.

minList(X, [], X).
minList(X, [Y | T], N) :- minList(Y, T, N1), min(X, N1, N).
minList([X | T], M) :- minList(X, T, M).

visina(X, 1) :- atomic(X).
visina([_], 1).
visina([_, L, R], N) :- visina(L, VL), visina(R, VR), max(VL, VR, M), N is M + 1.
