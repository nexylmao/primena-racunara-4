brojelemenata([], 0).
brojelemenata([_], 1).
brojelemenata([_, L, R], N) :- brojelemenata(L, NL), brojelemenata(R, NR), N is NL + NR + 1.