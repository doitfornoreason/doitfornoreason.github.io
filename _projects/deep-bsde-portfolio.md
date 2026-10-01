---
title: "Optimal Portfolio Allocation with Deep BSDE"
description: "Solving a high-dimensional optimal portfolio allocation problem in a Black-Scholes market with neural networks (E et al. 2017)."
icon: "bi-graph-up-arrow"
icon_color: "#8b5cf6"
tags:
  - machine learning
  - stochastic calculus
  - financial mathematics
date: 2026-06-01
ongoing: false
---

# TL;DR

A neural-network solver for a high-dimensional optimal portfolio allocation problem, from the AMSI Summer School course "Machine Learning in Financial Mathematics". An investor in a market of 10 risky assets must decide how much wealth to hold in each (all fractions constrained to \\([0, 1]\\)) so that a terminal liability is hedged optimally in an exponential-utility sense. Classic PDE methods fall over in high dimensions, so the project uses the Deep BSDE method (E, Han & Jentzen 2017): small feed-forward networks approximate the gradient of the value function \\(\nabla u(t, W_t)\\) at each time step, the initial value \\(u(0,0)\\) and gradient \\(\nabla u(0,0)\\) are treated as free trainable parameters, and everything is fitted by minimising how badly the simulated terminal wealth misses the liability \\(h(W_T)\\). The networks converge quickly, recovering the initial capital required to be indifferent to the liability, and the per-asset hedging ratios stabilise at distinct levels matching the analytic solution derived by hand in the first part of the project.

# Technical Explanation

## Problem setup

A market with \\(m = 10\\) risky assets, each following geometric Brownian motion:

$$
S_T^i = S_0 \exp\left( \left( b^i - \frac{1}{2}(\sigma^i)^2 \right) T + \sigma^i W_T^i \right)
$$

with volatilities \\(\sigma^i = i/20\\), drifts \\(b^i = \sigma^i \left( 0.5\sin(2i) + 1 \right)\\), time horizon \\(T = 1\\), and a portfolio constraint: the fraction of wealth \\(\alpha^i\\) held in asset \\(i\\) must stay in \\([0, A]\\) with \\(A = 1\\) (no shorting, no leverage).

## Exponential-utility framework and the analytic solution (Part 1)

Wealth evolves as \\(dX_t^\alpha = \sum_{i=1}^m \alpha_t^i\, dS_t^i / S_t^i\\). Using a CARA (exponential) utility, define the utility process

$$
U_t^\alpha = -\exp\left( -X_t^\alpha + Y_t \right),
$$

where \\(Y\\) is driven by \\(dY_t = -f(t, Z_t)\,dt + \sum_{i=1}^m Z_t^i\, dW_t^i\\) and \\(f\\) is left free for now. With \\(\Theta_t = -X_t^\alpha + Y_t\\), Ito's formula gives

$$
dU_t^\alpha = U_t^\alpha \left[ \left( \frac{1}{2}\sum_{i=1}^m \left| \alpha_t^i \sigma^i - Z_t^i \right|^2 - \sum_{i=1}^m \alpha_t^i b^i - f(t, Z_t) \right) dt + \sum_{i=1}^m \left( Z_t^i - \alpha_t^i \sigma^i \right) dW_t^i \right].
$$

Choosing the driver \\(f\\) as the minimum over the constraint set \\(C = [0, A]^m\\),

$$
f(t, Z_t) := \min_{\alpha \in C} \left( \frac{1}{2} \sum_{i=1}^m \left| \alpha^i \sigma^i - Z_t^i \right|^2 - \sum_{i=1}^m \alpha^i b^i \right),
$$

makes the drift non-positive for every admissible \\(\alpha\\): since \\(U_t^\alpha < 0\\), \\(\mathbb{E}[U_t^\alpha]\\) is non-increasing, i.e. \\(U^\alpha\\) is a supermartingale. The minimising control zeroes the drift, making \\(U^{\alpha^*}\\) a true martingale, and it has the closed form of a projected gradient:

$$
\alpha_t^{i,*} = \mathrm{Proj}_{[0,A]}\left( \frac{Z_t^i}{\sigma^i} + \frac{b^i}{(\sigma^i)^2} \right).
$$

This analytic solution is what the numerical scheme plugs into the driver.

## Deep BSDE scheme (Part 2)

The value function \\(u\\) solves a semilinear PDE whose Feynman-Kac representation is the BSDE

$$
Y_t = h(W_T) + \int_t^T f(s, Z_s)\, ds - \int_t^T Z_s\, dW_s, \qquad Z_t = \nabla u(t, W_t).
$$

The Deep BSDE method (E et al. 2017, building on the forward scheme of Hu, Imkeller & Muller 2005) discretises \\([0, T]\\) into \\(N = 3\\) steps (\\(\Delta t = 1/3\\)) and iterates Euler-Maruyama:

$$
W_{n+1} = W_n + \Delta W_n, \qquad Y_{n+1} \approx Y_n - f(t_n, Z_n)\,\Delta t + Z_n \cdot \Delta W_n, \qquad \Delta W_n \sim \mathcal{N}(0, \Delta t)^m.
$$

Since \\(W_0 = 0\\) is deterministic, the initial values \\(Y_0 = u(0,0)\\) and \\(Z_0 = \nabla u(0,0)\\) are free trainable parameters; at the intermediate steps \\(t = 1/3\\) and \\(t = 2/3\\), the gradient \\(Z_t\\) is produced by a feed-forward sub-network taking \\(W_t \in \mathbb{R}^{10}\\) and outputting \\(Z_t \in \mathbb{R}^{10}\\).

**Architecture** (per sub-network): \\(M \rightarrow (M+10) \rightarrow \mathrm{BatchNorm} \rightarrow \mathrm{ReLU} \rightarrow (M+10) \rightarrow \mathrm{BatchNorm} \rightarrow \mathrm{ReLU} \rightarrow M\\). The \\(M+10\\) hidden width lets each network capture interactions between the 10 assets. Implemented in PyTorch.

**Training.** Adam with initial learning rate \\(0.01\\), a StepLR scheduler halving the rate every 500 epochs, batch size 64, and 2000 epochs. The loss is the mean squared error between the simulated terminal wealth and the target liability:

$$
L(\theta) = \mathbb{E}\left[ \left| Y_T^\theta - h(W_T) \right|^2 \right], \qquad h(W_T) = \frac{1}{1 + \exp\left(-\sum_{i=1}^m S_T^i / 10\right)} - 0.5 .
$$

The geometric exponent inside \\(h\\) is clamped to \\([-50, 50]\\) to prevent overflow in \\(\exp\\).

## Results and observations

- **\\(u(0,0)\\) estimate:** \\(Y_0\\) converges rapidly to a stable value, the initial capital required to be indifferent to the liability \\(h(W_T)\\) under the optimal strategy.
- **\\(\nabla u(0,0)\\) components:** the components of \\(Z_0\\) stabilise at distinct levels. These correspond to the hedging ratios \\(\sigma^i \alpha^i\\) adjusted for the control, and their variation across assets reflects the differing drifts \\(b^i\\) and volatilities \\(\sigma^i\\).
- **Loss never reaches zero:** expected behaviour. With a coarse mesh (\\(N = 3\\)), the Euler-Maruyama discretisation error of order \\(\mathcal{O}(\sqrt{\Delta t})\\) persists even for a perfect network.
- **Minor oscillations in \\(Z_0\\)** in later epochs are a characteristic of mini-batch stochastic gradient descent: the estimate fluctuates around the true mean.

# References

- E, W., Han, J., Jentzen, A. (2017). "Deep Learning-Based Numerical Methods for High-Dimensional Parabolic PDEs and Backward Stochastic Differential Equations." SIAM Journal on Scientific Computing.
- Hu, Y., Imkeller, P., Muller, M. (2005). "Utility Maximization in Incomplete Markets." Annals of Applied Probability.